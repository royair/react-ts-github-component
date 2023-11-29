import styled from "styled-components";
import {FC} from "react";
import {Tooltip} from "antd";
import {Dayjs} from "dayjs";
import * as classNames from "classnames";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3 | 4 | 5
  date?: Dayjs
  commits?: number
  isDimmed?: boolean
  withTooltip?: boolean
}

export const Day: FC<Props> = ({level = 1, date, commits, isDimmed = false, withTooltip = true, ...rest}) => {
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
  opacity: 1;
  transition: all 0.3s ease-in;

  @keyframes fadeOut {
    0% { opacity: 1;}
    99% { opacity: 0.01;width: 100%; height: 100%;}
    100% { opacity: 0;width: 0; height: 0;}
  }

  &.isDimmed {
    opacity: 0.2;
  }    
`

