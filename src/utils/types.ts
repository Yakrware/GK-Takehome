/**
 * The type of the Repository object used in server API calls
 *
 * @example of a Repository object
 * ```json
 * {
 *   "id": "15452919",
 *   "fullName": "ethereum/go-ethereum",
 *   "createdAt": "2013-12-26T13:05:46Z",
 *   "stargazersCount": 26012,
 *   "language": "Go",
 *   "url": "https://api.github.com/repos/ethereum/go-ethereum"
 * }
 * ```

 */
export type Repository = {
  /**
   * The unique identifier for a product
   */
  id: string;
  /**
   * Name of the repository
   */
  fullName: string;
  /**
   * CreatedAt of repository
   */
  createdAt: string;
  /**
   * Number of stargazers
   */
  stargazersCount: number;
  /**
   * Language of the repository
   */
  language: string;
  /**
   * URL of the repository
   */
  url: string;
};

/**
 * The type of the Github API Repository object used in Github API calls
 *
 * @example of a GithubResponseRepository object
 * ```json
 * {
 *   "id": "15452919",
 *   "fullName": "ethereum/go-ethereum",
 *   "createdAt": "2013-12-26T13:05:46Z",
 *   "stargazersCount": 26012,
 *   "language": "Go",
 *   "url": "https://api.github.com/repos/ethereum/go-ethereum"
 * }
 * ```

 */
export type GithubResponseRepository = {
  /**
   * The unique identifier for a product
   */
  description: string;
  /**
   * The unique identifier for a product
   */
  id: string;
  /**
   * Name of the repository
   */
  full_name: string;
  /**
   * CreatedAt of repository
   */
  created_at: string;
  /**
   * Number of stargazers
   */
  stargazers_count: number;
  /**
   * Language of the repository
   */
  language: string;
  /**
   * Github URL of the repository
   */
  html_url: string;
};

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
};
