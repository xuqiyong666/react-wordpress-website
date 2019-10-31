
import easyFormater from './easyFormater'

let reader = {
  read_article_full_image_url: function(article){
    if(!article){
      return
    }
    let emb = article["_embedded"]
    if(!emb){
      return
    }
    let featureMedias = emb["wp:featuredmedia"]
    if(!featureMedias || !featureMedias.length){
      return
    }
    let featureMedia = featureMedias[0]

    let mediaDetails = featureMedia["media_details"]
    if(!mediaDetails){
      return featureMedia.source_url
    }

    let sizes = mediaDetails["sizes"]
    if(!sizes){
      return featureMedia.source_url
    }

    let largeThumb = sizes["full"]
    if(!largeThumb){
      return featureMedia.source_url
    }

    return largeThumb.source_url
  },
  read_article_date: function(article){
    if(!article){
      return
    }

    return easyFormater.format_date(article.modified)
  },
  read_article_category: function(article){
    if(!article){
      return
    }
    let emb = article["_embedded"]
    if(!emb){
      return
    }
    let terms = emb["wp:term"]
    if(!terms || !terms.length){
      return
    }

    let categories = terms[0]
    if(!categories || !categories.length){
      return
    }

    let category = categories[0]

    return category
  },
  read_article_author: function(article){
    if(!article){
      return
    }
    let emb = article["_embedded"]
    if(!emb){
      return
    }
    let authors = emb["author"]
    if(!authors || !authors.length){
      return
    }

    let author = authors[0]
    return author
  },
}

export default reader