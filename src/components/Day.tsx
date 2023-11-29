import styled from "styled-components";
import {FC} from "react";
import {Tooltip} from "antd";
import {Dayjs} from "dayjs";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3 | 4 | 5
  date: Dayjs
  commits: number
}

export const Day: FC<Props> = ({level = 1, date, commits}) => {
  return (
      <Tooltip title={`${date.format('ddd, DD-MM-YYYY')}, ${commits} commits`}>
        <Container className={`color${level}`}>
        </Container>
      </Tooltip>
  );
};

const Container = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 2px;
`

