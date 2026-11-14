import { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ArticleStateType>(defaultArticleState);

  const handleSettingChange = (
    key: keyof ArticleStateType
  ): ((value: OptionType) => void) => {
    return (value: OptionType): void => {
      setSettings((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
  };

  const handleReset = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSettings(defaultArticleState);
    onApply(defaultArticleState);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(settings);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
        <form className={styles.form} onReset={handleReset} onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            <Text as="h2" size={31} weight={800} uppercase>
              Задайте параметры
            </Text>
            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={settings.fontFamilyOption}
              onChange={handleSettingChange('fontFamilyOption')}
            />
            <RadioGroup
              title="Размер шрифта"
              name="fontSize"
              options={fontSizeOptions}
              selected={settings.fontSizeOption}
              onChange={handleSettingChange('fontSizeOption')}
            />
            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={settings.fontColor}
              onChange={handleSettingChange('fontColor')}
            />
            <Separator />
            <Select
              title="Цвет фона"
              options={backgroundColors}
              selected={settings.backgroundColor}
              onChange={handleSettingChange('backgroundColor')}
            />
            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={settings.contentWidth}
              onChange={handleSettingChange('contentWidth')}
            />
          </div>
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
