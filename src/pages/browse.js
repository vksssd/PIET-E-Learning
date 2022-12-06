import React from 'react';
import { BrowseContainer } from '../containers/browse';
import { useContent } from '../hooks';
import { selectionFilter } from '../utils';

export default function Browse() {
  const { articles } = useContent('articles');
  const { books } = useContent('books');
  const slides = selectionFilter({ articles, books });

  return <BrowseContainer slides={slides} />;
}