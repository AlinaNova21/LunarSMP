#!/bin/bash
cd resourcepacks/lunar_smp
zip -r lunar_smp.zip *
cp lunar_smp.zip ../../docs
cp lunar_smp.zip ../../www
rm lunar_smp.zip