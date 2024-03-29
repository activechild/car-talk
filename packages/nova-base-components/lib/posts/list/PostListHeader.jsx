import React from 'react';

import SmartContainers from "meteor/utilities:react-list-container";
const ListContainer = SmartContainers.ListContainer;

const PostListHeader = () => {

  ({PostViews, SearchForm, CategoriesList, HeadTags} = Telescope.components)

  return (
    <div>
      <HeadTags />
      <div className="post-list-header">
        <div className="post-list-categories">
          <ListContainer collection={Categories} limit={0} resultsPropName="categories" component={CategoriesList}/>
        </div>
        <PostViews />
        <SearchForm/>
      </div>
    </div>
  )
}

module.exports = PostListHeader;
export default PostListHeader;