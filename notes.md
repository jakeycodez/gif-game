To do: 
image sizes, postion them into a 2x2


BEM rough: 

hero
	__title (title for our game)
	__container
		__gif images (flex wrap of 4 images associated with the answer)

answer section
	__title question (Can you guess the correct commonality amongst the GIFs?!)
	__input
	__button to submit answer

	__response (Ooh try again, correct)

	__button to reveal answer
	__button (Try another set of GIFs) "/"



Presntation: wanted to use tags as multiple answers, and use get request to tap into array of tags
- randomly chooses one of our secret answer from our array of answers
- we use this answer to do a get request of gifs