import { cva } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/lib/utils';

export const Typography =({
  variant = 't1',
  weight = 'regular',
  className = '',
  children,
  ...restProps
}) => {
  const typographyVariants = cva('not-italic text-white', {
    variants: {
      variant: {
        h1: 'text-foreground text-xl sm:text-4xl md:text-6xl',
        h2: 'text-foreground text-xl sm:text-3xl md:text-5xl',
        h3: 'text-foreground text-lg sm:text-2xl md:text-4xl',
        h4: 'text-foreground text-lg sm:text-xl md:text-3xl',
        h5: 'text-foreground text-lg sm:text-xl md:text-2xl',
        t1: 'text-foreground text-lg md:text-xl',
        t2: 'text-foreground text-base md:text-lg',
        t3: 'text-foreground text-base',
        t4: 'text-foreground text-sm',
        t5: 'text-foreground text-xs',
        t6: 'text-foreground text-[0.625rem] leading-[0.75rem]',
        t7: 'text-foreground text-[0.5rem] leading-[0.5rem]'
      },
      weight: {
        regular: 'font-normal',
        medium: 'font-medium',
        semiBold: 'font-semibold',
        bold: 'font-bold'
      }
    },
    defaultVariants: {
      variant: 't1',
      weight: 'regular'
    }
  });
  const Component = ['h1', 'h2', 'h3', 'h4', 'h5'].includes(variant)
    ? (variant)
    : 'p';

  return (
    <Component
      className={cn(typographyVariants({ variant, weight, className }))}
      {...restProps}
    >
      {children}
    </Component>
  );
};
