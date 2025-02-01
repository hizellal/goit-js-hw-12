export function createGallery(arr) {
    return arr.map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<li class='gallery-images'>
            <a href='${largeImageURL}'>
                <img 
                class='gallery-image' 
                src='${webformatURL}' 
                alt='${tags.split(",").slice(0, 3)}' 
                />
            </a>
        <div class='gallery-image-card js-gallery-image-card'>
            <p class='image-card-likes'><span class="card-title">Likes</span><br>${likes}</p>
            <p class='image-card-views'><span class="card-title">Views</span><br>${views}</p>
            <p class='image-card-comments'><span class="card-title">Comments</span><br>${comments}</p>
            <p class='image-card-downloads'><span class="card-title">Downloads</span><br>${downloads}</p>
        </div>
    </li>`
      )
      .join('');
  }