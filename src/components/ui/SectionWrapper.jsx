import React from 'react';

/**
 * SectionWrapper component for standardized page layout sections
 * Enforces responsive max-width container, horizontal padding, and vertical spacing
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.id] - Section anchor id for smooth scrolling (e.g., 'hero', 'tentang', 'produk', 'kontak')
 * @param {string} [props.className=''] - Styles for the full-width outer section (e.g., bg-surface-light)
 * @param {string} [props.containerClassName=''] - Additional styles for the inner constrained container
 * @param {React.ElementType} [props.as='section'] - Semantic HTML tag
 */
export default function SectionWrapper({
  children,
  id,
  className = '',
  containerClassName = '',
  as: Component = 'section',
  ...props
}) {
  return (
    <Component id={id} className={`w-full ${className}`.trim()} {...props}>
      <div className={`w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 ${containerClassName}`.trim()}>
        {children}
      </div>
    </Component>
  );
}
