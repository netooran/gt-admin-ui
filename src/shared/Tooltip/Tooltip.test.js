import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppConstants from '../../constants';
import { delay } from '../../utils/utils/utils';
import Tooltip from './Tooltip';

const tooltipText = 'You are hovering me';
const hoverText = 'Hover Me';

test('renders tooltip normally', async () => {
  const { container } = render(
    <Tooltip message={tooltipText}>{hoverText}</Tooltip>
  );

  expect(container).toMatchSnapshot();
  expect(screen.getByText(tooltipText)).not.toBeVisible();

  userEvent.hover(container);
  // FIX ME: Must assert on visibility of the tooltip on hover & unhover
  expect(screen.getByText(tooltipText)).toBeInTheDocument();
});

test(`renders hover content on load for ${AppConstants.tootipActiveTime}`, async () => {
  const { container } = render(
    <Tooltip message={tooltipText} showTooltipOnLoad>
      {hoverText}
    </Tooltip>
  );

  expect(container).toMatchSnapshot();
  expect(screen.getByText(tooltipText)).toBeVisible();

  await delay(AppConstants.tootipActiveTime + 1);
  expect(screen.getByText(tooltipText)).not.toBeVisible();
});
