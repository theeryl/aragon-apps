import React from 'react'
import styled from 'styled-components'
import { Button, Countdown, TableCell, TableRow } from '@aragon/ui'
import { VOTE_ABSENT } from '../vote-types'
import ProgressBar from './ProgressBar'
import VoteStatus from './VoteStatus'

class VoteRow extends React.Component {
  handleVoteClick = () => {
    this.props.onSelectVote(this.props.id)
  }
  render() {
    const {
      endDate,
      question,
      votesYea,
      votesNay,
      tokenSupply,
      opened,
    } = this.props
    const totalVotes = votesYea + votesNay
    return (
      <TableRow>
        <StatusCell>
          {opened ? (
            <Countdown end={endDate} />
          ) : (
            <VoteStatus
              votesYea={votesYea}
              votesNay={votesNay}
              opened={opened}
            />
          )}
        </StatusCell>
        <QuestionCell>
          <QuestionWrapper>
            <div>{question}</div>
          </QuestionWrapper>
        </QuestionCell>
        <Cell align="right">{totalVotes}</Cell>
        <BarsCell>
          <BarsGroup>
            <Bar>
              <ProgressBar
                type="positive"
                progress={totalVotes > 0 ? votesYea / tokenSupply : 0}
              />
            </Bar>
            <Bar>
              <ProgressBar
                type="negative"
                progress={totalVotes > 0 ? votesNay / tokenSupply : 0}
              />
            </Bar>
          </BarsGroup>
        </BarsCell>
        <ActionsCell>
          <Button mode="outline" onClick={this.handleVoteClick}>
            Open Vote
          </Button>
        </ActionsCell>
      </TableRow>
    )
  }
}

VoteRow.defaultProps = {
  question: '',
  votesYea: 0,
  votesNay: 0,
  userVote: VOTE_ABSENT,
  opened: false,
  onSelectVote: () => {},
}

const Cell = styled(TableCell)`
  vertical-align: top;
`

const StatusCell = styled(Cell)`
  vertical-align: top;
  width: 190px;
`

const QuestionCell = styled(Cell)`
  width: 40%;
`

const BarsCell = styled(Cell)`
  flex-shrink: 0;
  width: 25%;
  min-width: 200px;
`

const ActionsCell = styled(Cell)`
  width: 0;
`

const QuestionWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & > div:first-child {
    width: 100%;
    margin-right: 20px;
  }
`

const BarsGroup = styled.div`
  width: 100%;
`

const Bar = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }
`

export default VoteRow
