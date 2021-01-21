import React from 'react';
import { orderList, weekFromMondayToSunday } from './utils';
import CrowdHistoryPropTypes from './propTypes';

const t = (k) => k;

function CrowdHistory({ visits, selectedTab, setSelectedTab, labels, now }) {
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
            className={day === selectedTab ? 'active' : null}
            aria-selected={day === selectedTab}
            onClick={() => setSelectedTab(day)}
          >
            <span>{t(day)}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`control-${selectedTab}`}
        aria-labelledby={selectedTab}
      >
        <figure>
          <div className="pf-chart">
            {orderList(
              visits.map((size, index) => (
                <div className="pf-bar" key={labels[index]}>
                  <label
                    className={index % 3 !== 0 ? 'pf-visually-hidden' : ''}
                    htmlFor={labels[index]}
                  >
                    {t(labels[index])}
                  </label>
                  <meter
                    className={now.hours === index + 1 ? 'current' : ''}
                    id={labels[index]}
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

CrowdHistory.propTypes = CrowdHistoryPropTypes;

export default CrowdHistory;
