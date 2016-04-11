#!/bin/sh

db=blue
collection=census
csv=census.csv
json=census.json
data_url=http://www.census.gov/popest/data/counties/asrh/2014/files/CC-EST2014-ALLDATA.csv

if [ ! -f "$csv" ]; then 
    echo "Downloading data...";
    wget $data_url -O $csv;
fi

echo "Cleaning data..."
rm -f census.json  

echo "Parsing CSV to JSON..."
command='NR > 1{ print "{\"SUMLEV\":\""$1"\",\"STATE\":\""$2"\",\"COUNTY\":\""$3"\",\"STNAME\":\""$4"\",\"CTYNAME\":\""$5"\",\"YEAR\":\""$6"\",\"AGEGRP\":\""$7"\",\"TOT_POP\":"$8",\"TOT_MALE\":"$9",\"TOT_FEMALE\":"$10",\"WA_MALE\":"$11",\"WA_FEMALE\":"$12",\"BA_MALE\":"$13",\"BA_FEMALE\":"$14",\"IA_MALE\":"$15",\"IA_FEMALE\":"$16",\"AA_MALE\":"$17",\"AA_FEMALE\":"$18",\"NA_MALE\":"$19",\"NA_FEMALE\":"$20",\"TOM_MALE\":"$21",\"TOM_FEMALE\":"$22",\"WAC_MALE\":"$23",\"WAC_FEMALE\":"$24",\"BAC_MALE\":"$25",\"BAC_FEMALE\":"$26",\"IAC_MALE\":"$27",\"IAC_FEMALE\":"$28",\"AAC_MALE\":"$29",\"AAC_FEMALE\":"$30",\"NAC_MALE\":"$31",\"NAC_FEMALE\":"$32",\"NH_MALE\":"$33",\"NH_FEMALE\":"$34",\"NHWA_MALE\":"$35",\"NHWA_FEMALE\":"$36",\"NHBA_MALE\":"$37",\"NHBA_FEMALE\":"$38",\"NHIA_MALE\":"$39",\"NHIA_FEMALE\":"$40",\"NHAA_MALE\":"$41",\"NHAA_FEMALE\":"$42",\"NHNA_MALE\":"$43",\"NHNA_FEMALE\":"$44",\"NHTOM_MALE\":"$45",\"NHTOM_FEMALE\":"$46",\"NHWAC_MALE\":"$47",\"NHWAC_FEMALE\":"$48",\"NHBAC_MALE\":"$49",\"NHBAC_FEMALE\":"$50",\"NHIAC_MALE\":"$51",\"NHIAC_FEMALE\":"$52",\"NHAAC_MALE\":"$53",\"NHAAC_FEMALE\":"$54",\"NHNAC_MALE\":"$55",\"NHNAC_FEMALE\":"$56",\"H_MALE\":"$57",\"H_FEMALE\":"$58",\"HWA_MALE\":"$59",\"HWA_FEMALE\":"$60",\"HBA_MALE\":"$61",\"HBA_FEMALE\":"$62",\"HIA_MALE\":"$63",\"HIA_FEMALE\":"$64",\"HAA_MALE\":"$65",\"HAA_FEMALE\":"$66",\"HNA_MALE\":"$67",\"HNA_FEMALE\":"$68",\"HTOM_MALE\":"$69",\"HTOM_FEMALE\":"$70",\"HWAC_MALE\":"$71",\"HWAC_FEMALE\":"$72",\"HBAC_MALE\":"$73",\"HBAC_FEMALE\":"$74",\"HIAC_MALE\":"$75",\"HIAC_FEMALE\":"$76",\"HAAC_MALE\":"$77",\"HAAC_FEMALE\":"$78",\"HNAC_MALE\":"$79",\"HNAC_FEMALE\":"$80"}"}'
awk -F, "$command" $csv >> $json

echo "Importing data to mongo..."
mongoimport -d $db -c $collection --file $json

echo "Done!"
