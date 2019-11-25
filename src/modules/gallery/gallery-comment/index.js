import React from 'react'
import { Avatar, Tag, Divider, Icon, Tooltip, Menu, Dropdown, Input } from 'antd/lib'
import { formatDistance, format } from 'date-fns'
import IconWrapper from '../../../components/icon-wrapper'
import './style.css'

function formatCommentDate(date) {
	return formatDistance(new Date(date), new Date())
}

function formatImageUploadDate(date) {
	return format(new Date(date), 'd MMMM yyyy')
}

function MoreAction(props) {
	const { hasAuthorRight } = props

	const menu = (
		<Menu>
			<Menu.Item key="0">
				<IconWrapper alignIcon="left" icon={{ type: 'edit' }} text="Edit..." />
			</Menu.Item>
			<Menu.Item key="1">
				<IconWrapper alignIcon="left" icon={{ type: 'delete' }} text="Delete..." />
			</Menu.Item>
		</Menu>
	)

	if (hasAuthorRight) {
		return (
			<Dropdown overlay={menu} trigger={['click']}>
				<Tooltip
					title="Edit or delete this"
					autoAdjustOverflow
					getPopupContainer={() => document.querySelector('.modal-gallery__comment')}
				>
					<Icon type="ellipsis" />
				</Tooltip>
			</Dropdown>
		)
	}

	return (
		<Tooltip title="Hide or report this" overlayStyle={{ backgroundColor: 'black' }}>
			<Icon type="ellipsis" />
		</Tooltip>
	)
}

function CommentList({ comments }) {
	return (
		<ul className="gallery-content__comment-list">
			{comments.map(({ comment, author }) => (
				<li key={comment.id}>
					<Avatar className="gallery-content__icon" icon="user" />
					<div className="gallery-content__comment-box">
						<div>
							<div className="gallery-content__comment-bubble">
								<a href={author.profileUrl}>{author.name}</a>
								<span>{comment.text}</span>
							</div>
							<div className="gallery-content__more-action">
								<MoreAction hasAuthorRight />
							</div>
						</div>
						<div className="gallery-content__reaction">
							<a href="#like">Like</a>
							<span>{'\u00B7'}</span>
							<a href="#reply">Reply</a>
							<span>{formatCommentDate(comment.date)}</span>
						</div>
					</div>
				</li>
			))}
		</ul>
	)
}

export default function GalleryComment(props) {
	const {
		contentOfSelectedImage: { comments, commentsCount, uploader, tags, likes, imageUploadDate, isAdmin },
	} = props

	function renderCommentInfo() {
		const text = `${commentsCount} comment${commentsCount > 1 ? 's' : ''}`
		return (
			<div className="gallery-content__comment-info">
				<a href="#gallery-text">{text}</a>
			</div>
		)
	}

	return (
		<div className="gallery-content">
			<div className="gallery-content__scroll-area">
				<div className="gallery-content__uploader">
					<Avatar className="gallery-content__icon" icon="user" />
					<div className="gallery-content__image-info">
						<div className="gallery-content__name">
							<strong>{uploader.name}</strong>
						</div>
						<div className="gallery-content__upload-date">{formatImageUploadDate(imageUploadDate)}</div>
					</div>
				</div>
				<div className="gallery-content__title">Ropa vieja, cuban traditional dish on a tapas format</div>
				<div className="gallery-content__tags">
					{tags.map(tag => (
						<Tag key={tag.id}>
							<a href="https://github.com/ant-design/ant-design/issues/1862">{tag.text}</a>
						</Tag>
					))}
				</div>
				<div className="gallery-content__engagement-info">
					<IconWrapper alignIcon="left" icon={{ type: 'like', theme: 'twoTone' }} text={likes} />
					{renderCommentInfo()}
				</div>
				<Divider />
				<div className="gallery-content__comments">
					<div className="gallery-content__view-more">
						<a href="#gallery-comment">View 14 more comments</a>
					</div>
					<CommentList comments={comments} isAdmin={isAdmin} />
					<CommentList comments={comments} isAdmin={isAdmin} />
				</div>
			</div>
			<div className="gallery-content__write-comment">
				<Avatar className="gallery-content__icon" icon="user" />
				<Input placeholder="Write a comment..." />
			</div>
		</div>
	)
}
