#!/usr/bin/env python3
"""
로고 이미지 자동 처리 스크립트
- 배경 제거 (흰색, 회색, 잔여 픽셀)
- 흰색 로고 보존
- 동일 높이 정렬
- PNG 투명 배경 변환
"""

import sys
import os
from PIL import Image, ImageChops, ImageDraw, ImageFilter
import numpy as np
from pathlib import Path

def detect_white_logo(image_array):
    """흰색 로고 감지"""
    # 이미지의 주요 색상 분석
    # 흰색 픽셀이 많으면 흰색 로고일 가능성
    if image_array.shape[2] == 4:  # RGBA
        rgb = image_array[:, :, :3]
        alpha = image_array[:, :, 3]
    else:  # RGB
        rgb = image_array
        alpha = np.ones((image_array.shape[0], image_array.shape[1])) * 255
    
    # 흰색 픽셀 비율 계산 (R>240, G>240, B>240)
    white_mask = (rgb[:, :, 0] > 240) & (rgb[:, :, 1] > 240) & (rgb[:, :, 2] > 240)
    white_ratio = np.sum(white_mask) / (image_array.shape[0] * image_array.shape[1])
    
    return white_ratio > 0.3

def remove_background(image_path, output_path):
    """
    배경 제거 및 로고 처리
    """
    try:
        # 이미지 로드
        img = Image.open(image_path).convert('RGBA')
        img_array = np.array(img)
        
        # 흰색 로고 감지
        is_white_logo = detect_white_logo(img_array)
        
        if is_white_logo:
            # 흰색 로고: 배경 제거 후 외곽선 추가
            img = remove_white_background_preserve_logo(img)
            add_subtle_outline(img)
        else:
            # 일반 로고: 배경 제거
            img = remove_colored_background(img)
        
        # PNG로 저장 (투명 배경)
        img.save(output_path, 'PNG')
        return True
    except Exception as e:
        print(f"Error processing {image_path}: {e}", file=sys.stderr)
        return False

def remove_white_background_preserve_logo(img):
    """흰색 배경 제거하면서 로고 보존"""
    img = img.convert('RGBA')
    data = np.array(img)
    
    # 흰색 및 연한 회색 배경 감지 (R>200, G>200, B>200)
    white_mask = (data[:, :, 0] > 200) & (data[:, :, 1] > 200) & (data[:, :, 2] > 200)
    
    # 알파 채널 수정
    data[white_mask, 3] = 0  # 투명하게 설정
    
    # 엣지 스무딩 (압축 잔여 픽셀 제거)
    data = smooth_edges(data)
    
    result = Image.fromarray(data, 'RGBA')
    return result

def remove_colored_background(img):
    """컬러 배경 제거"""
    img = img.convert('RGBA')
    data = np.array(img)
    
    # 배경색 감지 (이미지 가장자리에서 가장 많은 색)
    edge_colors = np.vstack([
        data[0, :],  # 상단
        data[-1, :],  # 하단
        data[:, 0],  # 좌측
        data[:, -1]  # 우측
    ])
    
    # 가장 흔한 색 찾기
    bg_color = find_dominant_color(edge_colors[:, :3])
    
    # 배경색 제거 (임계값 포함)
    tolerance = 30
    mask = np.all(np.abs(data[:, :, :3].astype(int) - bg_color) < tolerance, axis=2)
    
    data[mask, 3] = 0  # 투명하게 설정
    
    # 엣지 스무딩
    data = smooth_edges(data)
    
    result = Image.fromarray(data, 'RGBA')
    return result

def find_dominant_color(colors):
    """이미지 가장자리에서 배경색 찾기"""
    # 각 색상의 빈도 계산
    unique_colors, counts = np.unique(colors.reshape(-1, 3), axis=0, return_counts=True)
    return unique_colors[np.argmax(counts)]

def smooth_edges(data):
    """엣지 스무딩으로 압축 잔여 픽셀 제거"""
    # 알파 채널에 가우시안 블러 적용
    alpha = data[:, :, 3]
    alpha_img = Image.fromarray(alpha, 'L')
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=1))
    data[:, :, 3] = np.array(alpha_img)
    
    return data

def add_subtle_outline(img):
    """흰색 로고에 미세한 외곽선 추가"""
    # 현재는 투명 배경만 사용하므로 외곽선 추가 생략
    # 필요시 나중에 구현
    pass

def normalize_logo_height(image_path, output_path, target_height=80):
    """
    로고 높이 정규화
    - 모든 로고를 동일 높이로 정렬
    - 원본 비율 유지
    """
    try:
        img = Image.open(image_path).convert('RGBA')
        
        # 현재 높이 가져오기
        current_height = img.size[1]
        
        if current_height != target_height:
            # 비율 계산
            ratio = target_height / current_height
            new_width = int(img.size[0] * ratio)
            
            # 리사이징 (고품질)
            img = img.resize((new_width, target_height), Image.Resampling.LANCZOS)
        
        # 캔버스 생성 (패딩 추가)
        canvas = Image.new('RGBA', (int(new_width * 1.2), target_height), (0, 0, 0, 0))
        offset = (int(new_width * 0.1), 0)
        canvas.paste(img, offset, img)
        
        canvas.save(output_path, 'PNG')
        return True
    except Exception as e:
        print(f"Error normalizing {image_path}: {e}", file=sys.stderr)
        return False

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: logo-processor.py <input_path> <output_path> [--normalize]")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    normalize = '--normalize' in sys.argv
    
    # 배경 제거
    if remove_background(input_path, output_path):
        # 높이 정규화
        if normalize:
            temp_path = output_path + '.tmp'
            os.rename(output_path, temp_path)
            normalize_logo_height(temp_path, output_path)
            os.remove(temp_path)
        print(f"Success: {output_path}")
    else:
        print(f"Failed to process {input_path}")
        sys.exit(1)
