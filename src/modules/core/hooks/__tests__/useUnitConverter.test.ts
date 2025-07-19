import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUnitConverter } from '../useUnitConverter';
import { 
  MassUnitOfMeasure, 
  VolumeUnitOfMeasure, 
  LengthUnitOfMeasure 
} from '@/modules/supplies/interfaces/UnitOfMeasure';

describe('useUnitConverter', () => {
  it('should convert mass units correctly', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    // Convertir de gramos a kilogramos
    expect(result.current.convert(1000, MassUnitOfMeasure.GRAMOS, MassUnitOfMeasure.KILOGRAMOS)).toBe(1);
    
    // Convertir de kilogramos a gramos
    expect(result.current.convert(1, MassUnitOfMeasure.KILOGRAMOS, MassUnitOfMeasure.GRAMOS)).toBe(1000);
    
    // Convertir de libras a gramos
    expect(result.current.convert(1, MassUnitOfMeasure.LIBRAS, MassUnitOfMeasure.GRAMOS)).toBe(453.592);
  });

  it('should convert volume units correctly', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    // Convertir de mililitros a litros
    expect(result.current.convert(1000, VolumeUnitOfMeasure.MILILITROS, VolumeUnitOfMeasure.LITROS)).toBe(1);
    
    // Convertir de litros a mililitros
    expect(result.current.convert(1, VolumeUnitOfMeasure.LITROS, VolumeUnitOfMeasure.MILILITROS)).toBe(1000);
    
    // Convertir de galones a mililitros
    expect(result.current.convert(1, VolumeUnitOfMeasure.GALONES, VolumeUnitOfMeasure.MILILITROS)).toBe(3785.41);
  });

  it('should convert length units correctly', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    // Convertir de milímetros a centímetros
    expect(result.current.convert(10, LengthUnitOfMeasure.MILIMETROS, LengthUnitOfMeasure.CENTIMETROS)).toBe(1);
    
    // Convertir de centímetros a milímetros
    expect(result.current.convert(1, LengthUnitOfMeasure.CENTIMETROS, LengthUnitOfMeasure.MILIMETROS)).toBe(10);
    
    // Convertir de metros a milímetros
    expect(result.current.convert(1, LengthUnitOfMeasure.METROS, LengthUnitOfMeasure.MILIMETROS)).toBe(1000);
    
    // Convertir de centímetros a metros
    expect(result.current.convert(100, LengthUnitOfMeasure.CENTIMETROS, LengthUnitOfMeasure.METROS)).toBe(1);
  });

  it('should return the same value when converting to the same unit', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    expect(result.current.convert(100, MassUnitOfMeasure.GRAMOS, MassUnitOfMeasure.GRAMOS)).toBe(100);
    expect(result.current.convert(50, VolumeUnitOfMeasure.LITROS, VolumeUnitOfMeasure.LITROS)).toBe(50);
    expect(result.current.convert(25, LengthUnitOfMeasure.METROS, LengthUnitOfMeasure.METROS)).toBe(25);
  });

  it('should throw error when converting between different unit types', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    expect(() => {
      result.current.convert(100, MassUnitOfMeasure.GRAMOS, VolumeUnitOfMeasure.LITROS);
    }).toThrow('No se puede convertir entre unidades de mass y volume');
    
    expect(() => {
      result.current.convert(100, VolumeUnitOfMeasure.LITROS, LengthUnitOfMeasure.METROS);
    }).toThrow('No se puede convertir entre unidades de volume y length');
    
    expect(() => {
      result.current.convert(100, LengthUnitOfMeasure.METROS, MassUnitOfMeasure.KILOGRAMOS);
    }).toThrow('No se puede convertir entre unidades de length y mass');
  });

  it('should return correct unit types', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    expect(result.current.getUnitType(MassUnitOfMeasure.GRAMOS)).toBe('mass');
    expect(result.current.getUnitType(MassUnitOfMeasure.KILOGRAMOS)).toBe('mass');
    expect(result.current.getUnitType(VolumeUnitOfMeasure.LITROS)).toBe('volume');
    expect(result.current.getUnitType(VolumeUnitOfMeasure.MILILITROS)).toBe('volume');
    expect(result.current.getUnitType(LengthUnitOfMeasure.METROS)).toBe('length');
    expect(result.current.getUnitType(LengthUnitOfMeasure.MILIMETROS)).toBe('length');
  });

  it('should round results to 3 decimal places', () => {
    const { result } = renderHook(() => useUnitConverter());
    
    // Convertir de libras a onzas (1 lb = 16 oz)
    const poundsToOunces = result.current.convert(1, MassUnitOfMeasure.LIBRAS, MassUnitOfMeasure.ONZAS);
    expect(poundsToOunces).toBe(16);
    
    // Convertir de galones a litros (1 gal = 3.78541 L)
    const gallonsToLiters = result.current.convert(1, VolumeUnitOfMeasure.GALONES, VolumeUnitOfMeasure.LITROS);
    expect(gallonsToLiters).toBe(3.785);
  });
}); 