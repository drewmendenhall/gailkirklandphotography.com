import React from 'react'

import Link, { LinkProps } from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'

type NavLinkProps = LinkProps & {
  children: React.ReactElement
  className: string
}

const NavLink = ({ children, className, ...props }: NavLinkProps) => {
  const router = useRouter()

  return (
    <Link {...props}>
      {router.pathname === props.href ? React.cloneElement(children, {
        className: classNames(className, {
          active: true,
        })
      }) : children}
    </Link>
  )
}

export default NavLink
