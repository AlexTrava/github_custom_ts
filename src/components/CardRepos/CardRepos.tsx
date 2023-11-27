import React from "react";

export type CardReposProps = {
  name: string;
  description?: string;
  url: string;
};

const CardRepos: React.FC<CardReposProps> = ({ name, description, url }) => {
  return (
    <div className="card_repos">
      <a href={url} className="link_repos">
        {name}
      </a>
      <p className="title_repos">{description}</p>
    </div>
  );
};

export default CardRepos;
