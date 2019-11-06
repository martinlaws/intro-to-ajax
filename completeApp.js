const fetchAndRenderRedditPosts = async () =>  {
  try {
    const response = await $.ajax({
      url: `https://www.reddit.com/r/${getUserInput()}.json`,
      type: 'GET',
      dataType: 'JSON'
    })

    const renderedPosts = renderPosts(response.data.children)

    $('#app').append(renderedPosts)
  } catch (err) {
    console.error(err)
  }
}

// The following is also a totally valid approach to fetchAndRenderRedditPosts using .then and .catch =>
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

// This function loops over each of the posts returned by the api and renders it into markup
const renderPosts = posts => {
  const renderedPostsArray = []

  for (let post of posts) {
    const { thumbnail, permalink, title } = post.data

    console.log(thumbnail, title)

    if (isThumbnailValid(thumbnail)) {
      renderedPostsArray.push(`
        <a href="https://www.reddit.com${permalink}" title="${title}" target="_blank">
          <img alt="${title}" src="${thumbnail}" />
        </a>
      `)
    }
  }

  return renderedPostsArray.join('')
} 

// This function checks if the thumbnail value matches one of our known invalid cases
const isThumbnailValid = thumbnailURL => {
  const blacklistedValues = ['self', undefined, null, 'unknown', '', 'default']

  if (blacklistedValues.includes(thumbnailURL)) {
    return false
  }

  return true
}

// This function grabs the value of the subreddit input on the page
const getUserInput = () => $('#subreddit-input').val()