import React from 'react'
import classnames from 'classnames'

const VoteStepView = ({ activeId }) => {
    return (
        <ul class="step step-md step-dashed">
            <li class="step-item">
                <div class="step-content-wrapper">
                <span class={classnames("step-icon", {
                    "step-icon-soft-primary": activeId === 1,
                    "step-icon-soft-secondary": activeId === 2,
                })}>1</span>
                <div class="step-content">
                    <h4>투표권 생성</h4>
                    <p class="step-text">보유한 CVT 토큰을 소각하여 본 안건에 대한 투표권을 얻는 과정입니다.</p>
                </div>
                </div>
            </li>

            <li class="step-item">
                <div class="step-content-wrapper">
                <span class={classnames("step-icon", {
                    "step-icon-soft-primary": activeId === 2,
                    "step-icon-soft-secondary": activeId === 1,
                })}>2</span>
                <div class="step-content">
                    <h4>투표하기</h4>
                    <p class="step-text">과정1 에서 생성한 투표권을 이용하여 투표를 진행합니다. 입력한 투표권의 제곱근만큼만 영향력을 행사하는 제곱-투표 방식을 사용하고 있습니다.</p>
                </div>
                </div>
            </li>
        </ul>
    )
}

export default VoteStepView