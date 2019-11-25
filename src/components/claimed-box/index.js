import React from 'react';
import { Popover, Icon } from 'antd/lib';
import './style.css'

function Claimed() {
  const content = (
    <div>
      <div>Someone from this business manages this listing.</div>
      <div><a>Learn more</a></div>
    </div>
  )

  return (
    <Popover placement="bottomLeft" content={content} trigger="hover">
        <span><Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> Claimed</span>
    </Popover>
  )
}

function Unclaimed() {
  const content = (
    <div>
      <div>This business is unclaimed. Owners who claim their business can update listing details, add photos, respond to reviews, and more.</div>
      <div><a>Claim your free listing now</a></div>
    </div>
  )

  return (
    <Popover placement="bottomLeft" content={content} trigger="hover" style={{maxWidth: '300px'}}>
        <span className="claimed-box__unclaimed">Unclaimed</span>
    </Popover>
  )
}

function ClaimedBox(props) {
  const { isClaimed } = props;
  
  return (
    <span className="claimed-box">
      { isClaimed ? <Claimed/> : <Unclaimed/> }
    </span>
  )
}


export default ClaimedBox;
