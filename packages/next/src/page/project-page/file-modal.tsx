import { useContext, useMemo, useState } from "react";
import { Button, Modal, ScrollArea } from "@mantine/core";
import FilterInput from "#component/filter-input";
import joinUrl from "#utils/url-join";
import { ProjectContext } from "./context";

import type { FC } from "react";
import type {
  ButtonStylesNames,
  ButtonStylesParams,
  Styles
} from "@mantine/core";

const buttonStyles: Styles<ButtonStylesNames, ButtonStylesParams> = theme => ({
  inner: {
    justifyContent: "flex-start"
  },
  root: {
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs
  }
});

export interface Props {
  opened: boolean;
  onClose: () => void;
}

const Component: FC<Props> = props => {
  const { result } = useContext(ProjectContext);
  const { onClose, opened } = props;
  const [filter, setFilter] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const paths = useMemo(() => {
    const {
      data: { files },
      project
    } = result;
    if (!filter) {
      return files.map(file => (
        <Button
          fullWidth
          variant="subtle"
          styles={buttonStyles}
          key={file}
          onClick={e => {
            e.preventDefault();
            const url = joinUrl(`/project/${project.id}/file/`, file);
            window.open(url, "_blank");
          }}
        >
          {file}
        </Button>
      ));
    }
    return files
      .filter(file => {
        let casedFile = caseSensitive ? file : file.toLowerCase();
        const casedFilter = caseSensitive ? filter : filter.toLowerCase();
        for (const char of casedFilter) {
          const index = casedFile.indexOf(char);
          if (index < 0) {
            return false;
          }
          casedFile = casedFile.slice(index + 1);
        }
        return true;
      })
      .map(file => (
        <Button
          fullWidth
          variant="subtle"
          styles={buttonStyles}
          key={file}
          onClick={e => {
            e.preventDefault();
            const url = joinUrl(`/project/${project.id}/file/`, file);
            window.open(url, "_blank");
          }}
        >
          {file}
        </Button>
      ))
      .slice(0, 5);
  }, [filter, caseSensitive, result]);
  return (
    <Modal opened={opened} onClose={onClose} title="Files">
      <FilterInput
        filter={filter}
        setFilter={setFilter}
        caseSensitive={caseSensitive}
        setCaseSensitive={setCaseSensitive}
      />
      <ScrollArea.Autosize>{paths}</ScrollArea.Autosize>
    </Modal>
  );
};

Component.displayName = "FileModal";
export default Component;
