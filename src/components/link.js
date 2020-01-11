import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"
import classNames from "classnames"
import classes from "../styles/link.module.sass"

export const Link = ({
  children,
  to,
  href,
  onClick,
  variant,
  hidden,
  className,
  ...other
}) => {
  const destination = to || href
  const external = /(http(s?)):\/\//gi.test(destination)
  const linkClassNames = classNames(classes.root, className, {
    [classes.hidden]: hidden,
    [classes.secondary]: variant === "secondary",
  })
  if (!external) {
    if ((destination && /^#/.test(destination)) || onClick) {
      return (
        <a href={destination} onClick={onClick} className={linkClassNames}>
          {children}
        </a>
      )
    }
    return (
      <GatsbyLink to={destination} className={linkClassNames} {...other}>
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a
      href={destination}
      className={linkClassNames}
      target="_blank"
      rel="noopener nofollow noreferrer"
      {...other}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  variant: PropTypes.oneOf(["secondary", null]),
  hidden: PropTypes.bool,
}

export default Link
