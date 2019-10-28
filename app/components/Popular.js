import React from "react";
import Battle from "./Battle";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";

import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from "react-icons/fa";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
  return (
    <div>
      <ul className="languages-list">
        {languages.map(language => (
          <li className="languages-list-item" key={language}>
            <button
              style={language === selected ? { color: "rgb(187,45,30" } : null}
              onClick={() => onUpdateLanguage(language)}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url} className="repo-bg-light">
            <h4 className="header-lg center-text">#{index + 1}</h4>
            <img
              className="avatar"
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />

            <h2 className="center-text">
              <a className="link" href={html_url}>
                {login}
              </a>
            </h2>

            <ul clasName="card-list">
              <li>
                <FaUser color="rgb(255,191,116)" size={22} />
                <a href={`https://github.com/${login}`}></a>
                {login}
              </li>

              <li>
                <FaStar color="rgb(255,215,0)" size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>

              <li>
                <FaCodeBranch color="rgb(255,215,0)" size={22} />
                {forks.toLocaleString()} forks
              </li>

              <li>
                <FaCodeBranch color="rgb(255,215,0)" size={22} />
                {forks.toLocaleString()} forks
              </li>

              <li>
                <FaExclamationTriangle color="rgb(255,215,0)" size={22} />
                {open_issues.toLocaleString()} open open_issues
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
      repos: {},
      error: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({ selectedLanguage, error: null });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }));
        })
        .catch(() => {
          console.log(error);
          this.setState({
            error: "error when fetching"
          });
        });
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        ></LanguagesNav>

        {this.isLoading() && <p>Loading</p>}
        {error && <p>{error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
        <Battle></Battle>
      </React.Fragment>
    );
  }
}
