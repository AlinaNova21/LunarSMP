#!/bin/bash
cd resourcepacks/lunar_smp
cp ../Anemoia+1.17.zip ../lunar_smp.zip
zip -r ../lunar_smp_base.zip *
zip -r ../lunar_smp.zip *
cd ..
cp lunar_smp.zip ../docs
cp lunar_smp.zip ../www
rm lunar_smp.zip
rm lunar_smp_base.zip