import React from 'react';
import { Link } from 'react-router-dom';

function NewsContainer({ news }) {
  const { imageUrl, title, date, author, description, likes, comments, shares, link } = news;

  return (
    <div className="col-lg-6 col-md-12 mb-4">
      <div className="news_h_1i row m-0">
        <div className="col-md-5 p-0">
          <div className="news_h_1ir">
            <Link to={link}> {/* Use the dynamic link */}
              <img src={imageUrl} className="w-100" alt={title} /> {/* Dynamic image URL and alt text */}
            </Link>
          </div>
        </div>
        <div className="col-md-7 p-0">
          <div className="news_h_1il p-3">
            <h4 className="mb-2">
              <Link to={link} className="text-decoration-none">
                {title} {/* Dynamic title */}
              </Link>
            </h4>
            <h6 className="text-muted small mb-2">{date} / By {author} {/* Dynamic date and author */}</h6>
            <p className="mb-3">{description}</p> {/* Dynamic description */}
            <div className="news_h_1ili row m-0 align-items-center">
              <div className="col-md-4 p-0">
                <h5 className="mb-0">
                  <Link to={link} className="col_1 fw-bold text-decoration-none">
                    Read more...
                  </Link>
                </h5>
              </div>
              <div className="col-md-8">
                <ul className="list-inline mb-0 d-flex justify-content-end">
                  <li className="list-inline-item me-3">
                    <i className="fa fa-heart col_1 me-1"></i> {likes} {/* Dynamic likes count */}
                  </li>
                  <li className="list-inline-item me-3">
                    <i className="fa fa-comment col_1 me-1"></i> {comments} {/* Dynamic comments count */}
                  </li>
                  <li className="list-inline-item">
                    <i className="fa fa-share-alt col_1 me-1"></i> {shares} {/* Dynamic shares count */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsContainer;