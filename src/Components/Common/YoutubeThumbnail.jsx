import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const Thumbnail = styled.div`
  margin: 0.2rem auto;
  padding: 0.3rem;
  border-radius: 0.5em;
  width: 11.875em;
  height: 9.375em;
  // margin-left: 1.875em;
  // border: 0.0625em solid yellow;
  display: flex;
  align-items: space-between;
  flex-wrap: wrap;
  position: relative;
  .fab {
    position: absolute;
    font-size: 3.125em;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    color: red;
    &:hover {
      color: #870b02;
    }
  }
  .behind-play {
    position: absolute;
    width: 1.25em;
    height: 1.25em;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
  }
`;
const VideoWrapper = styled.div`
  // position: relative;
  height: 16.25em;

  display: block;
  // border: 0.0625em solid red;
  border: 0.0625em solid #dfe1e5;
  border-radius: 0.5em;
  cursor: pointer;
  margin: 1.2rem;
  padding: 0.3rem;
  background: #fff;
  box-shadow: 0 0.875em 1.75em rgba(0, 0, 0, 0.25), 0 0.625em 0.625em rgba(0, 0, 0, 0.22);
  font-size: 0.78rem;
  color: #444;
  p {
    font-size: 0.7rem;
    margin: 0.8rem;
  }
`;
const CreatedAt = styled.p`
  // position: absolute;
  bottom: 0em;
  margin: 0.2rem;
  padding: 0.3rem;
  color: #999;
  align-self: flex-end;
`;
const YoutubeThumbnail = props => {
  const { title, imgUrl, url, publishedAt } = props;
  const isLongTitle = title.length >= 100;
  return (
    <VideoWrapper>
      <Thumbnail>
        <img src={imgUrl} style={{ width: "100%", height: "100%" }} />
        <span className="behind-play"></span>
        <i className="fab fa-youtube"></i>
      </Thumbnail>
      <p>{isLongTitle ? `${title.slice(0, 100)}...` : `${title}`}</p>
      <CreatedAt>{dayjs(publishedAt).fromNow()}</CreatedAt>
    </VideoWrapper>
  );
};

export default YoutubeThumbnail;
