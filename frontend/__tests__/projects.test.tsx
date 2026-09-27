import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import SectionProjects from '../pages/home/section/projects';
import {projects} from '../data/projects';

describe('SectionProjects', () => {
  it('renders every project title and tagline', () => {
    render(<SectionProjects />);

    for (const project of projects) {
      expect(
        screen.getByRole('heading', {name: project.title}),
      ).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
    }
  });

  it('links each card to the project GitHub page', () => {
    render(<SectionProjects />);

    expect(
      screen.getByRole('link', {name: 'ts2gas on GitHub'}),
    ).toHaveAttribute('href', 'https://github.com/grant/ts2gas');
    expect(
      screen.getByRole('link', {name: 'Computer Checklist on GitHub'}),
    ).toHaveAttribute(
      'href',
      'https://github.com/grant/new-computer-checklist',
    );
  });
});
