import { useCallback, useState } from "react";
import { Button, Group, Switch } from "@mantine/core";
import { TbHash, TbKey, TbMinus, TbPlus, TbTag } from "react-icons/tb";
import { useFormContext } from "#page/search-page/context";

import type { ChangeEventHandler, FC, MouseEventHandler } from "react";

export interface Props {
  value: string;
  setValue: (value: string) => void;
}

const Component: FC<Props> = props => {
  const { value, setValue } = props;
  const [isAnd, setIsAnd] = useState(true);
  const [type, setType] = useState(true);
  const form = useFormContext();
  const onIsAndChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => setIsAnd(e.currentTarget.checked),
    []
  );
  const onTypeChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => setType(e.currentTarget.checked),
    []
  );
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.preventDefault();
      if (!value) {
        return;
      }
      if (isAnd && type) {
        if (!form.values.tags.includes(value)) {
          form.insertListItem("tags", value);
        }
      } else if (isAnd && !type) {
        if (!form.values.keywords.includes(value)) {
          form.insertListItem("keywords", value);
        }
      } else if (!isAnd && type) {
        if (!form.values.notTags.includes(value)) {
          form.insertListItem("notTags", value);
        }
      } else if (!form.values.notKeywords.includes(value)) {
        form.insertListItem("notKeywords", value);
      }
      setValue("");
    },
    [value, setValue, form, isAnd, type]
  );
  return (
    <Group position="apart">
      <Switch
        size="md"
        onLabel={<TbPlus size="1rem" />}
        offLabel={<TbMinus size="1rem" />}
        checked={isAnd}
        onChange={onIsAndChange}
      />
      <Switch
        size="md"
        onLabel={<TbHash size="1rem" />}
        offLabel={<TbKey size="1rem" />}
        checked={type}
        onChange={onTypeChange}
      />
      <Button
        leftIcon={<TbTag size="1rem" />}
        onClick={onClick}
        variant="light"
      >
        Create
      </Button>
    </Group>
  );
};

Component.displayName = "SearchPage/Aside/InputSection/Control";
export default Component;
