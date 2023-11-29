import styled from "styled-components";
import {FC} from "react";
import {Tooltip} from "antd";
import {Dayjs} from "dayjs";
import * as classNames from "classnames";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3 | 4 | 5
  date?: Dayjs
  commits?: number
  isDimmed: boolean
  withTooltip?: boolean
}

export const Day: FC<Props> = ({level = 1, date, commits, isDimmed = false, withTooltip = true, ...rest}) => {
  console.log(isDimmed)

  return (
      <Tooltip
          {...(withTooltip ? undefined : {open: false})}
          title={`${date?.format('ddd, DD-MM-YYYY')}, ${commits} commits`}
          {...rest}
      >
        <Container className={classNames(`color${level}`, {isDimmed})}>
        </Container>
      </Tooltip>
  );
};

const Container = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 2px;

  .isDimmed {
    opacity: 0.5;
  }
`

