import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { ArticleStateType, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [articleParamsFormState, setArticleParamsFormState] =
    useState<ArticleStateType>(defaultArticleState);
  const [isArticleParamsFormOpen, setIsArticleParamsFormOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) | undefined => {
    if (!isArticleParamsFormOpen) {
      return;
    }
    const handleClickOutside = (event: MouseEvent): void => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsArticleParamsFormOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isArticleParamsFormOpen]);

  const handleSettingChange = (
    key: keyof ArticleStateType
  ): ((value: OptionType) => void) => {
    return (value: OptionType): void => {
      setArticleParamsFormState((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
  };

  const handleToggle = (): void => {
    setIsArticleParamsFormOpen((prev) => !prev);
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setArticleParamsFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(articleParamsFormState);
  };

  return (
    <div ref={formRef}>
      <ArrowButton isOpen={isArticleParamsFormOpen} onClick={handleToggle} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isArticleParamsFormOpen,
        })}
      >
        <form className={styles.form} onReset={handleReset} onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            <Text as="h2" size={31} weight={800} uppercase>
              Задайте параметры
            </Text>
            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={articleParamsFormState.fontFamilyOption}
              onChange={handleSettingChange('fontFamilyOption')}
            />
            <RadioGroup
              title="Размер шрифта"
              name="fontSize"
              options={fontSizeOptions}
              selected={articleParamsFormState.fontSizeOption}
              onChange={handleSettingChange('fontSizeOption')}
            />
            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={articleParamsFormState.fontColor}
              onChange={handleSettingChange('fontColor')}
            />
            <Separator />
            <Select
              title="Цвет фона"
              options={backgroundColors}
              selected={articleParamsFormState.backgroundColor}
              onChange={handleSettingChange('backgroundColor')}
            />
            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={articleParamsFormState.contentWidth}
              onChange={handleSettingChange('contentWidth')}
            />
          </div>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
