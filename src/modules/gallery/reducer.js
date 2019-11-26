const initialState = {
	selectedImage: '4k7m57g',
	images: [],
	content: {
		'4k7m57g': {
			uploader: {
				name: 'Marton Hajdu',
				image: {
					src: 'asdsad',
				},
			},
			imageUploadDate: '2019-07-07T09:24:40.446Z',
			tags: [
				{
					id: '1232',
					text: 'Soup',
				},
				{
					id: '6544',
					text: 'Main',
				},
			],
			likes: 5,
			commentsCount: 27,
			comments: [
				{
					author: {
						imageSrc: '',
						name: 'Marton Hajdu',
						profileUrl: 'asd',
					},
					comment: {
						id: 'adasd',
						text: 'This is a really amazing picture. I very much liked it.',
						date: '2019-07-06T09:24:40.446Z',
						reactions: [
							{
								type: 'like',
								amount: 3,
							},
							{
								type: 'sad',
								amount: 5,
							},
						],
					},
				},
				{
					author: {
						imageSrc: '',
						name: 'Gabor Ottlik',
						profileUrl: 'asd',
					},
					comment: {
						id: 'llgfd',
						text: 'That is another brilliant comment from me.',
						date: '2019-07-07T09:24:40.446Z',
						reactions: [
							{
								type: 'like',
								amount: 6,
							},
							{
								type: 'sad',
								amount: 2,
							},
						],
					},
				},
			],
		},
		commentIds: ['asdad123'],
	},
}

export default function gallery(state = initialState, action) {
	switch (action.type) {
		case 'SET_IMAGES':
			return {
				...state,
				images: action.payload,
			}
		default:
			return state
	}
}
