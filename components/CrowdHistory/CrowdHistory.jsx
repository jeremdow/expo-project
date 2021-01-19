import React from 'react';
import { orderList, weekFromMondayToSunday } from './utils';

const t = (k) => k;

function CrowdHistory(props) {
  return (
    <div className="pf-crowd-history">
      <h3 className="pf-subheading-sm">{t('CrowdHistory')}</h3>
      <div className="pf-tabs" role="tablist">
        {weekFromMondayToSunday().map((day) => (
          <button
            id={day}
            key={day}
            type="button"
            role="tab"
            className={day === props.activeDay ? 'active' : null}
            aria-selected={day === props.activeDay}
            onClick={() => props.setActiveDay(day)}
          >
            <span>{t(day)}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`control-${props.activeDay}`}
        aria-labelledby={props.activeDay}
      >
        <figure>
          <div className="pf-chart">
            {orderList(
              props.currentData.map((size, index) => (
                <div className="pf-bar" key={props.labels[index]}>
                  <label
                    className={index % 3 !== 0 ? 'pf-visually-hidden' : ''}
                    htmlFor={props.labels[index]}
                  >
                    {t(props.labels[index])}
                  </label>
                  <meter
                    className={props.currentTime ? `current` : ''}
                    id={props.labels[index]}
                    style={{ height: size ? `${size}%` : '0%' }}
                  />
                </div>
              )),
            )}
          </div>
          <figcaption>{t('crowdHistoryDescription')}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default CrowdHistory;
