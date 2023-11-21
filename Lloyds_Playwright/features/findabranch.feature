Feature: Find a branch Functionality
@lloydsChrome
Scenario: Find a branch Functionality in Chrome Browser
    Given User navigates to the Personal Banking page in Chrome
    When User clicks on the Search bar
    When User clicks on Find a branch near me
    When Allow access to location pop up is displayed
	Then User is navigated to the Find branch page
    Then User arrives at the Find a branch page
    When User clicks on View branch first branch given in the search results
    Then Name and Address and Opening Days of the branch are displayed

@lloydsEdge
Scenario: Find a branch Functionality in Edge Browser
    Given User navigates to the Personal Banking page in Edge
    When User clicks on the Search bar
    When User clicks on Find a branch near me
    When Allow access to location pop up is displayed
	Then User is navigated to the Find branch page
    Then User arrives at the Find a branch page
    When User clicks on View branch first branch given in the search results
    Then Name and Address and Opening Days of the branch are displayed