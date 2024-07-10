// src/pages/SceneWrapper.jsx
import React, { useEffect, forwardRef } from 'react';
import { useThree } from '@react-three/fiber';

const SceneWrapper = forwardRef((props, ref) => {
  const { scene } = useThree();

  useEffect(() => {
    if (ref) {
      ref.current = scene;
    }
  }, [scene, ref]);

  return null;
});

export default SceneWrapper;
