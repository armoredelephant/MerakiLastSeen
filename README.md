# MerakiNeworkFinder

A script that process a list of networks and find networks that have not reached out to the meraki dashboard in over 4 months.

## Setup

- Clone the repo.
- Export the your network list from the overview section of the meraki dashboard.
- Open the exported spreadsheet in excel.
- Open network_list.csv from the last_seen_meraki folder
- Copy the Network column to columnOne of the network_list.csv
- Copy the Contacted column to columnTwo of the network_list.csv
- Save the spreadsheet as network_list.csv to the repo.

## Use

- With the network_list.csv ready to go in the repo, run npm start or yarn start from a terminal window terminal.
- Open /\_output/available_networks.csv to view the outputed network list.
