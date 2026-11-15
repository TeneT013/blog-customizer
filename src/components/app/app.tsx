import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { ArticleStateType } from '@/constants/articleProps';
import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [articleState, setArticleState] =
    useState<ArticleStateType>(defaultArticleState);
  const [isArticleParamsFormOpen, setIsArticleParamsFormOpen] = useState(false);
  const handleClose = (): void => {
    setIsArticleParamsFormOpen(false);
  };
  const handleToggle = (): void => {
    setIsArticleParamsFormOpen((prev) => !prev);
  };
  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
          '--bg-color': articleState.backgroundColor.value,
        } as CSSProperties
      }
      onClick={handleClose}
    >
      <ArticleParamsForm
        onApply={setArticleState}
        isOpen={isArticleParamsFormOpen}
        onToggle={handleToggle}
      />
      <Article />
    </main>
  );
};
