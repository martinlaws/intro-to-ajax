// this is the vanilla JS equivalent of $(document).ready():
// document.addEventListener('DOMContentLoaded', () => {
// })

const getUserInput = () => $("#subreddit-input").val();

const fetchAndRenderRedditPosts = () => {
  $.ajax({
    url: `https://www.reddit.com/r/${getUserInput()}.json`,
    type: "GET",
    dataType: "JSON"
  })
    .then(response => {
      const renderedPosts = formatRedditPosts(response.data.children);

      $("#app").append(renderedPosts);
      // document.getElementById('app').append(renderedPosts)
    })
    .catch(() => {
      const errorMessage = `
        <div class="error">
          <h1>Whoops, something went wrong!</h1>
          <p>Please try a different subreddit or call support at 967-1111</p>
        </div>
      `;

      $("#app").append(errorMessage);
    });
};

const formatRedditPosts = posts => {
  const markupArray = [];

  for (const post of posts) {
    const { title, permalink, thumbnail } = post.data;

    if (isThumbnailValid(thumbnail)) {
      markupArray.push(`
        <a href="https://www.reddit.com${permalink}" title="${title}" target="_blank">
          <img alt="${title}" src="${thumbnail}" />
        </a>
      `);
    }
  }

  return markupArray.join("");
};

// This function checks if the thumbnail value matches one of our known invalid cases
const isThumbnailValid = thumbnailURL => {
  const blacklistedValues = ["self", undefined, null, "unknown", "", "default"];

  if (blacklistedValues.includes(thumbnailURL)) {
    return false;
  }

  return true;
};
