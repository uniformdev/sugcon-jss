import React from 'react';
import { Link } from 'react-router-dom';

export interface RouterLinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  title?: string;
  linktype?: string;
  dataCy?: string;
  onClick?: any;
  ariaLabel?: string;
}

const RouterLink: React.FC<RouterLinkProps> = ({
  className = '',
  href,
  title = '',
  children,
  linktype = 'internal',
  dataCy = '',
  ariaLabel = '',
  onClick,
}) => {
  if ((linktype && linktype !== 'internal') || (href && href.startsWith('http'))) {
    return (
      <a
        className={className}
        href={href}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
        data-cy={dataCy}
        aria-label={ariaLabel ? ariaLabel : title}
        onClick={onClick ? onClick : null}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      aria-label={ariaLabel ? ariaLabel : title}
      className={className}
      to={href}
      title={title}
      data-cy={dataCy}
      onClick={onClick ? onClick : null}
    >
      {children}
    </Link>
  );
};

export default RouterLink;
