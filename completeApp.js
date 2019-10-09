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
    
    $('#app').append(await renderPosts(response.data.children))
  } catch (error) {
    console.error(error)
  }
}

const isThumbnailValid = thumbnail => thumbnail !== 'self' && thumbnail !== undefined && thumbnail !== null

const getUserInput = () => {
  const subredditInput = $('#subreddit-input')

  return subredditInput.val()
}

const renderPosts = posts => {
  const renderedPostsArray = []

  for (const post of posts) {
    const { thumbnail, title, permalink } = post.data

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