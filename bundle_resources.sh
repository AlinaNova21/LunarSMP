#!/bin/bash
cd resourcepacks/lunar_smp
cp ../Anemoia+1.17.zip ../lunar_smp.zip
zip -r ../lunar_smp_base.zip *
zip -r ../lunar_smp.zip *
cd ..
mv lunar_smp.zip ../docs
mv lunar_smp_base.zip ../docs
