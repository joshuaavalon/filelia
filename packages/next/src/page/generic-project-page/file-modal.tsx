import { useContext, useMemo, useState } from "react";
import { Button, Modal, ScrollArea } from "@mantine/core";
import FilterInput from "#component/filter-input";
import { findBestMatch } from "#utils/string-similarity";
import joinUrl from "#utils/url-join";
import { GenericProjectContext } from "./context";

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
  const { genericProject, project } = useContext(GenericProjectContext);
  const { onClose, opened } = props;
  const [filter, setFilter] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const paths = useMemo(() => {
    if (!filter) {
      return genericProject.files.map(file => (
        <Button
          fullWidth
          variant="subtle"
          styles={buttonStyles}
          key={file}
          onClick={e => {
            e.preventDefault();
            const url = joinUrl(`/generic-project/${project.id}/file/`, file);
            window.open(url, "_blank");
          }}
        >
          {file}
        </Button>
      ));
    }
    const included = genericProject.files.map(file =>
      caseSensitive ? file : file.toLowerCase()
    );
    const f = caseSensitive ? filter : filter.toLowerCase();
    const result = findBestMatch(f, included);
    const matches = result.ratings.sort((a, b) => b.rating - a.rating);
    return matches
      .map(match => (
        <Button
          fullWidth
          variant="subtle"
          styles={buttonStyles}
          key={match.target}
          onClick={e => {
            e.preventDefault();
            const url = joinUrl(
              `/generic-project/${project.id}/file/`,
              match.target
            );
            window.open(url, "_blank");
          }}
        >
          {match.target}
        </Button>
      ))
      .slice(0, 5);
  }, [filter, caseSensitive, genericProject.files, project.id]);
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
