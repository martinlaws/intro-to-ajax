// const fetchAndRenderRedditPosts = () =>  {
//   $.ajax({
//     url: `https://www.reddit.com/r/${getUserInput()}.json`,
//     type: 'GET',
//     dataType: 'JSON'
//   }).then( response => {
//     const renderedPosts = renderPosts(response.data.children)
    
//     $('#app').append(renderedPosts)
//   }).catch(error => {
//     console.error(error)
//   })
// }

const fetchAndRenderRedditPosts = async () =>  {
  try {
    const response = await $.ajax({
      url: `https://www.reddit.com/r/${getUserInput()}.json`,
      type: 'GET',
      dataType: 'JSON'
    })

    const renderedPosts = renderPosts(response.data.children)
    
    $('#app').append(renderedPosts)
  } catch (error) {
    console.error(error)
  }
}

const isImageValid = imageUrl => {
  if (imageUrl === 'self' && !imageUrl) {
    return false
  } else {
    return true
  }
}

const getUserInput = () => {
  const subredditInput = $('#subreddit-input')

  return subredditInput.val()
}

const renderPosts = posts => {
  const renderedPostsArray = []

  for (const post of posts) {
    const { title, permalink } = post.data
    const imageUrl = post.data.preview.images[0].source.url

    if (isImageValid(imageUrl)) {
      renderedPostsArray.push(`
        <a href="https://www.reddit.com${permalink}" title="${title}" target="_blank">
          <img alt="${title}" src="${imageUrl}" />
        </a>
      `)
    }
  }
  
  return renderedPostsArray.join('')
}