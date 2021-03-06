blue census
===========

This is a simple web service that returns US county-level Census information.
This information was retrieved from the US Census Bureau.

Access the service through:

http://bluecensus.mhsilva.io/



URLs
----
You can get information by issuing GET requests following:

Location options (required):
- /?lat=30&lon=-90
- /?state=New Jersey
- /?county=Union County

Additional options (optional):
- ?year=2013    (default is 2014)
- ?agegroup=2   (default is 0)

Available years:
- 2010
- 2011
- 2012
- 2013
- 2014

Available age groups:
- 0 = Total
- 1 = Age 0 to 4 years
- 2 = Age 5 to 9 years
- 3 = Age 10 to 14 years
- 4 = Age 15 to 19 years
- 5 = Age 20 to 24 years
- 6 = Age 25 to 29 years
- 7 = Age 30 to 34 years
- 8 = Age 35 to 39 years
- 9 = Age 40 to 44 years
- 10 = Age 45 to 49 years
- 11 = Age 50 to 54 years
- 12 = Age 55 to 59 years
- 13 = Age 60 to 64 years
- 14 = Age 65 to 69 years
- 15 = Age 70 to 74 years
- 16 = Age 75 to 79 years
- 17 = Age 80 to 84 years
- 18 = Age 85 years or older

More information
----------------
You can get more information about the data formats and fields here:

http://www.census.gov/popest/data/counties/asrh/2014/files/CC-EST2014-ALLDATA.pdf

This is the original source:

http://www.census.gov/popest/data/counties/asrh/2014/CC-EST2014-ALLDATA.html

