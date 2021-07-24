import React, { memo } from 'react';

interface IBreadcrumbProps {
  name?: string;
}

const Breadcrumb = memo((props: IBreadcrumbProps) => {
  const { name } = props;

  return (
    <nav>Hello</nav>
  );
});

export default Breadcrumb;
