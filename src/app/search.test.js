import { buildHistoryHTML, updateHistory} from './search.js';
import { JSDOM } from 'jsdom';

const { document } = (new JSDOM(`<div class="test"></div>`)).window;
const testNode = document.querySelector('.test');

let searchHistory = [];
const readLocalSearches = () => searchHistory;
const writeLocalSearches = (arr) => {searchHistory = arr};

describe('updateHistory', () => {
 test('should correctly add search terms to local storage', () => {
  searchHistory = ['cat', 'dog'];
  updateHistory('kittens', readLocalSearches, writeLocalSearches);
  expect(searchHistory[0]).toBe('kittens');
 });
 test('should not create duplicates of searches', () => {
  searchHistory = ['cat', 'dog'];
  updateHistory('cat', readLocalSearches, writeLocalSearches);
  expect(searchHistory.length).toBe(2);
  expect(searchHistory[1]).toBe('dog');
 });
 test('should re-order duplicates', () => {
  searchHistory = ['cat', 'dog'];
  updateHistory('dog', readLocalSearches, writeLocalSearches);
  expect(searchHistory.length).toBe(2);
  expect(searchHistory[0]).toBe('dog');
 });
 test('should have a max length of 5', () => {
   searchHistory = ['cat', 'dog', 'kittens', 'puppies', 'parrots'];
   updateHistory('sir', readLocalSearches, writeLocalSearches);
   expect(searchHistory.length).toBe(5);
   expect(searchHistory[0]).toBe('sir');
 })
});

describe('buildHistoryHTML', () => {
  test('should generate and return correct html', () => {
    searchHistory = ['cat', 'dog'];
    const html = buildHistoryHTML(searchHistory);
    testNode.innerHTML = html;
    expect(testNode.children.length).toBe(2);
  });
});
