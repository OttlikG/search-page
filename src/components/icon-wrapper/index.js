import React from 'react';
import { Icon } from 'antd/lib';
import classNames from 'classnames';
import './style.css';

function IconWrapper(props) {
  const { alignIcon = 'left', icon, text } = props;
  const padIcon = classNames({
    'icon-left': alignIcon === 'left',
    'icon-right': alignIcon === 'right'
  })

  return (
    <React.Fragment>
      { alignIcon === 'left'
          ? <span><span className={padIcon}><Icon {...icon} /></span>{text}</span>
          : <span>{text}<span className={padIcon}><Icon {...icon} /></span></span>
      }
    </React.Fragment>
  )
}

export default IconWrapper;