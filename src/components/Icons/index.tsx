import React from 'react';

// 自动导入 icons 目录下的所有 svg，转成 React 组件
const icons = import.meta.glob('@/assets/icons/*.svg', { eager: true, import: 'ReactComponent' });

const Icon = ({ name, size = 24, color, fill, className = '', ...rest }) => {
  const Component = icons[`@/assets/icons/${name}.svg`];

  if (!Component) {
    console.warn(`Icon "${name}" not found in assets/icons`);
    return null;
  }

  return <Component width={size} height={size} fill={fill || color || 'currentColor'} className={className} {...rest} />;
};

export default Icon;
