interface CardImage {
  tag: string;
  title: string;
  image: string;
}

export default function HomePageImg({
  contentList,
}: {
  contentList: CardImage | undefined;
}) {
  return (
    <div className="container-xl py-4">
      <div className="homepage-img-container">
        <div
          className="homepage-img-overlay"
          style={{ backgroundImage: `url("${contentList?.image}")` }}
        ></div>

        <div className="homepage-img-content">
          <div>{contentList?.tag}</div>
          <h1 className="homepage-img-title">{contentList?.title}</h1>
        </div>
      </div>
    </div>
  );
}
