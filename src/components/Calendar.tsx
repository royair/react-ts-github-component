import styled from "styled-components";
import {forEach, map} from "lodash";
import {useEffect, useState} from "react";
import * as dayjs from "dayjs";

import {Day} from "./Day.tsx";

const WEEKS = 52;
const DAYS = 7;
const DATE_TEMPLATE = 'DD-MM-YYYY';

export const Calendar = ({commitDates}: {
  commitDates: Date[]
}) => {
  const [maxCommits, setMaxCommits] = useState(0);
  const [calendarArr, setCalendarArr] = useState(new Array(DAYS))
  const [hoveredLevel, setHoveredLevel] = useState<number | undefined>(undefined)

  const getLevel = (commits: number) => {
    const percentage = commits / maxCommits
    if (percentage > 0.75) return 5
    if (percentage > 0.5) return 4
    if (percentage > 0.25) return 3
    if (percentage > 0) return 2
    return 1
  }

  useEffect(() => {
    const commitDatesMap = new Map();
    const tmpCalendarArr = new Array(DAYS);
    const firstDay = dayjs().day(6).subtract(363, 'days')
    let tmpMaxCommits = 0;

    // group existing commits by date
    forEach(commitDates, (commitDate) => {
      const dateFormatted = dayjs(commitDate).format(DATE_TEMPLATE)
      const foundDate = commitDatesMap.get(dateFormatted);

      // init or increase number of commits for each date
      foundDate
          ? foundDate.commits++
          : commitDatesMap.set(dateFormatted, {commits: 1})
    })

    // init calendar's array template
    map(new Array(364), (_item, index) => {
      const date = dayjs(firstDay).add(index, 'days')
      const dateFormatted = date.format(DATE_TEMPLATE)
      const commits = commitDatesMap.get(dateFormatted) ? commitDatesMap.get(dateFormatted).commits : 0
      const day = index % DAYS;

      // update tmpMaxCommits accordingly
      tmpMaxCommits = Math.max(tmpMaxCommits, commits)

      // init a day
      tmpCalendarArr[day] = tmpCalendarArr[day] || []

      // push date to its relevant day
      tmpCalendarArr[day].push({date, commits})
    })

    // update global state
    setCalendarArr(tmpCalendarArr)
    setMaxCommits(tmpMaxCommits)
  }, [commitDates])

  return (
      <Container>
        <table>
          <tbody>
            {map(calendarArr, (_item, dayIndex) => (
                <tr key={dayIndex}>
                  {map(calendarArr[dayIndex], (day, weekIndex) => (
                      <td key={weekIndex}>
                        {dayjs(day.date).isAfter(dayjs())
                            ? undefined
                            : <Day
                                date={day.date}
                                commits={day.commits}
                                isDimmed={hoveredLevel ? hoveredLevel !== getLevel(day.commits) : false}
                                level={getLevel(day.commits)}
                            />
                        }
                      </td>
                  ))}
                </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{color: 'gray', textAlign: "end"}}>
              <td colSpan={WEEKS}>
                <div
                    style={{display: 'flex', justifyContent: "end", gap: 5, marginTop: 10}}>

                  {map([1, 2, 3, 4, 5], (index: 1 | 2 | 3 | 4 | 5) => (
                      <Day
                          key={index}
                          withTooltip={false}
                          level={index}
                          onMouseEnter={() => setHoveredLevel(index)}
                          onMouseLeave={() => setHoveredLevel(undefined)}
                      />
                  ))}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </Container>
  );
};

const Container = styled.div`

`